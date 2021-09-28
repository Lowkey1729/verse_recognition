import Mp3Encoder from './mp3Encoder';
import WavEncoder from './wavEncoder';
import { convertTimeMMSS } from './util';
import { parse } from 'postcss';
import { after, runInContext } from 'lodash';


export default class {
    constructor(options={}){
        this.beforeRecording = options.beforeRecording;
        this.afterRecording = options.afterRecording;
        this.micFailed  = options.micFailed;
        this.pauseRecording = options.pauseRecording;
        this.format = options.format;
        this.isPause = false;
        this.isRecording = false;
        this.duration = 0;
        this.volume = 0;
        this._duration = 0;
        this.records = [];
        this.bufferSize = 4096;
        this.wavSamples = [];
        this.encoderOptions = {
            bitRate    : options.bitRate,
            sampleRate : options.sampleRate
          }
        this.stream = [];



    }

    startRecording(){
        const choices = {
            video: false,
            audio: {
                channelCount: 1,
                echoCancellation: false,
            }
        }

        // this.beforeRecording && this.beforeRecording("Start Recording.");

        navigator.mediaDevices.getUserMedia(choices)
                                .then(
                                    this.captureMic.bind(this)
                                    )
                                .catch(error => {
                                    this._micError.bind(this)
                                    console.error(error)
                                })
        this.isPause = false
        this.isRecording = false

        if(this._isMp3() && !this.lameEncoder){
            this.lameEncoder = new Mp3Encoder(this.encoderOptions)
        }


    }


    captureMic(stream){
        this.context = new(window.AudioContext || window.webkitAudioContext );
        this.duration = this._duration;
        this.input = this.context.createMediaStreamSource(stream);
        this.processor = this.context.createScriptProcessor(this.bufferSize, 1,1);
        this.stream = stream
        this.processor.onaudioprocess = (event) =>{
            const sample = event.inputBuffer.getChannelData(0);
            let sum = 0.0

            if(this._isMp3()){
                this.lameEncoder.encode(sample);
            }else{
                this.wavSamples.push(new Float32Array(sample))
            }

            for(let i=0; i<sample.length; ++i){
                sum += sample[i] * sample[i];
            }

            this.duration = parseFloat(this._duration) + parseFloat(this.context.currentTime.toFixed(2))
            this.volume = Math.sqrt(sum/sample.length).toFixed(2);

        }


        this.input.connect(this.processor)
        this.processor.connect(this.context.destination)


    }


    stopRecording(){

        this.stream.getTracks().forEach((track) => track.stop())
        this.input.disconnect();
        this.processor.disconnect();
        this.context.close()

        let record = null
        if(this._isMp3()){
            record = this.lameEncoder.finish()
        }else{
            let wavEncoder = new WavEncoder({
                bufferSize : this.bufferSize,
                sampleRate : this.encoderOptions.sampleRate,
                samples    : this.wavSamples,
            })

            record = wavEncoder.finish();
            this.wavSamples = [];
        }

        record.duration = convertTimeMMSS(this.duration)
        this.records.push(record)

        this._duration = 0
        this.duration = 0

        this.isPause = false
        this.isRecording = false
        console.log("Stop recording")
        this.afterRecording && this.afterRecording(record)
    }

    _isMp3(){
        return this.format.toLowerCase() === 'mp3';
    }

    _micError(error){
        return error
    }

    recordList(){
        return this.records
    }
}
