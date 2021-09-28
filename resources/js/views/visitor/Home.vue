<template>
    <div>
        <div class=" bg-gray-50 shadow-lg m-4 ">
            <h3 class=" font-semibold text-center text-lg">
                Quran Verse Searcher
            </h3>
        </div>
        <div class="flex flex-row gap-2 m-7">
            <div class="mt-4">
                <button
                    @click="startRecording"
                    :disabled="!isActive"
                    class="flex items-center bg-blue-500 hover:bg-purple-600 p-2 rounded  "
                >
                    <svg
                        :class="isActive ? '' : 'hidden'"
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                        />
                    </svg>

                    <svg
                        :class="isActive ? 'hidden' : ''"
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-6 w-6"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            fill-rule="evenodd"
                            d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z"
                            clip-rule="evenodd"
                        />
                    </svg>

                    <span class="text-white text-sm md:text-lg">{{
                        text
                    }}</span>
                </button>
            </div>

            <div class="mt-4">
                <button
                    @click="stopRecording"
                    class="flex items-center bg-red-500 hover:bg-pink-600 p-2 rounded  "
                    :class="isActive ? 'hidden' : ''"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            fill-rule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 00-1 1v4a1 1 0 001 1h4a1 1 0 001-1V8a1 1 0 00-1-1H8z"
                            clip-rule="evenodd"
                        />
                    </svg>

                    <span class="text-white">Stop</span>
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import Recorder from "../../lib/recorder";
export default {
    name: "home",
    data() {
        return {
            isActive: true,
            text: "Tap the mic icon to speak",
            recorder: this._initRecorder(),
            recordList: [],
            selected: {},
            isRecording: false
        };
    },

    methods: {
        startRecording() {
            this.isActive = false;
            this.text = "Recording...";
            if (!this.isRecording || (this.isRecording && this.isPause)) {
                this.recorder.startRecording();
                this.isRecording = true;
            } else {
                this.recorder.pause();
            }
        },

        stopRecording() {
            this.isActive = true;
            this.text = "Tap the mic icon to speak";
            this.isRecording = false

            this.recorder.stopRecording();
            this.recordList = this.recorder.recordList();
        },

        _initRecorder() {
            return new Recorder({
                attempts: 3,
                uploadUrl: "",
                time: 2,
                bitRates: 128,
                sampleRate: 44100,
                format: "mp3",
                micFailed: this.callback(),
                beforeRecording: this.callback(),
                pauseRecording: this.callback(),
                afterRecording: this.callback()
            });
        },
        callback(msg) {
            console.debug("Event: ", msg);
        }
    }
};
</script>
