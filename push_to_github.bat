@echo off
title Push to GitHub
cd /d "%~dp0"
set "PATH=C:\Users\BIT\AppData\Local\Microsoft\WinGet\Packages\Git.MinGit_Microsoft.Winget.Source_8wekyb3d8bbwe\cmd;C:\Users\BIT\AppData\Local\Programs\Git Credential Manager;%PATH%"

echo =========================================================
echo   Pushing to https://github.com/Urvikarajegit/laptop.git
echo =========================================================
echo.

git push -u origin main

echo.
if %ERRORLEVEL% EQU 0 (
    echo =========================================================
    echo   [SUCCESS] Code pushed to GitHub!
    echo =========================================================
) else (
    echo =========================================================
    echo   If prompted, sign in as Urvikarajegit in the browser.
    echo =========================================================
)
echo.
pause
