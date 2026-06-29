@echo off
cd /d C:\Users\Administrator\Desktop\ModLume\modlume
npm run build > build.log 2>&1
type build.log
