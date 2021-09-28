<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="theme-color" content="red">
    <title>Laravel</title>

    <!-- Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600;700" rel="stylesheet">
    <link rel="stylesheet" type="text/css" href="{{asset('/css/app.css')}}">

    <link href="https://unpkg.com/nprogress@0.2.0/nprogress.css" rel="stylesheet" />
    <script src="https://unpkg.com/nprogress@0.2.0/nprogress.js"></script>


</head>

<body class=" bg-gray-50 text-black  antialiased">
    <div id="app">

        <router-view></router-view>

    <div>

</body>


</html>

<script src="/js/app.js"></script>

