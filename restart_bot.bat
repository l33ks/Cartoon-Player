@echo off
tasklist /v /fo csv | findstr /i "streamer_bot" > pid_temp & for /F "tokens=2 delims=," %i in (pid_temp) do taskkill /f /pid %~i & del pid_temp & start_bot.bat