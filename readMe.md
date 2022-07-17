# Image Resizer Api (Express)
###### Fwd Advanced Full-Stack Web

this app build to request image from back end server with API ***'/image'*** and query ***'width'*** and ***'height'*** for resizing.

## Stracture
- build
- image <-- where you put your images
- output <-- where resized image saved 
- routes 
    -imageRoutes
- services
    - imageResizeService
- spec
    - helper
    -support
- src
    - index


## Usage

put your image in ***'/image'*** directory then call: 
```
http://localhost:3000/image?image=...&width=...&height=...
```

**Note**: don't forget image extension.