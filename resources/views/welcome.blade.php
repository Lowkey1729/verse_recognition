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

    <style>
    body {
        /* font-family: 'Helvetica'; */
        font-family: 'JetBrains Mono';

    }

    .dropdown:hover .dropdown-menu {
        display: block;
    }

    @media (max-width: 768px){
        .box-icon span {
    height: 40px;
    width: 40px;
}
    }


.box-icon span {
    display: block;
    height: 50px;
    width: 50px;
    background-position: 0 0;
    background-size: 100% 100%;
    -webkit-box-shadow: 0 8px 24px -2px rgb(0 0 0 / 30%), 0px -2px 12px 3px rgb(156 156 156 / 10%);
    box-shadow: 0 8px 24px -2px rgb(0 0 0 / 30%), 0px -2px 12px 3px rgb(156 156 156 / 10%);
    border-radius: 50%;
    border: 2px solid #fff;
}

.down{
    color: red;
}

.up{
    color: green;
}

.editor_listing_table {
    @apply w-full p-2 m-1;
}

    </style>
</head>

<body class=" bg-gray-50 text-black  antialiased">
    <div id="app">

        <router-view></router-view>

    <div>

</body>


</html>

<script src="/js/app.js"></script>

