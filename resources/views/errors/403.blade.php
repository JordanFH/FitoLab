@extends('errors::minimal')

@section('title', __('Prohibido'))
@section('code', '403')
@section('message', __('Prohibido'))
<!-- @section('message', __($exception->getMessage() ?: 'Forbidden')) -->
