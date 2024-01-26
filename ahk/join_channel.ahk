#NoEnv  ; Recommended for performance and compatibility with future AutoHotkey releases.
; #Warn  ; Enable warnings to assist with detecting common errors.
SendMode Input  ; Recommended for new scripts due to its superior speed and reliability.
SetWorkingDir %A_ScriptDir%  ; Ensures a consistent starting directory.
SetKeyDelay, 200, 200
SetTitleMatchMode, 2
WinActivate, - Discord
Sleep 500
SendInput, ^k
Sleep 500
send, {Text}!Video
Sleep 500
SendInput, {enter}