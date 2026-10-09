@echo off
title Push to GitHub
cd /d "%~dp0"

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
