Original size: 1920:1080
Downscaled size: 960:540

Downscale command (ffmpeg):

```bash
ffmpeg -i 01.mp4 -vf scale="iw/2:ih/2" small/01.mp4
ffmpeg -i 01.mp4 -vf scale="960:540" small/01.mp4
```

Probe command:

```bash
ffprobe -hide_banner -show_format -show_streams 01.mp4 > 01-probe.txt 2>&1
```
