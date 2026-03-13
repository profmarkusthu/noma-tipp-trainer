export function preloadImage(src) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
        img.src = src;
    });
}
export function preloadSpriteSheet(sprite) {
    return preloadImage(sprite.src);
}
export function drawSprite(ctx, image, sprite, frameIndex, x, y, width, height) {
    const frame = frameIndex % sprite.frameCount;
    const sx = frame * sprite.frameWidth;
    const sy = 0;
    try {
        ctx.drawImage(image, sx, sy, sprite.frameWidth, sprite.frameHeight, x, y, width, height);
    }
    catch (e) {
        // Image not yet loaded
    }
}
export function calculateAnimationFrame(fps, totalFrames, elapsed) {
    const frameDuration = 1 / fps;
    const frame = Math.floor((elapsed % (totalFrames * frameDuration)) / frameDuration);
    return frame % totalFrames;
}
