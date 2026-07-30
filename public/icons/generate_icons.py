from PIL import Image, ImageDraw, ImageFont
import math

INK = (8, 9, 13, 255)
TEAL = (23, 180, 166)
VIOLET = (124, 92, 252)
PINK = (216, 27, 107)
FONT_PATH = "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"


def lerp(a, b, t):
    return tuple(round(a[i] + (b[i] - a[i]) * t) for i in range(3))


def gradient_color(x, y, w, h):
    # Diagonal 3-stop gradient approximating the aurora brand gradient.
    t = (x / w + y / h) / 2
    if t < 0.5:
        return lerp(TEAL, VIOLET, t / 0.5)
    return lerp(VIOLET, PINK, (t - 0.5) / 0.5)


def make_icon(size, maskable=False, filename=None):
    img = Image.new("RGBA", (size, size), INK)
    draw = ImageDraw.Draw(img)

    # Safe-zone circle: on maskable icons the OS crops to its own shape, so
    # content must stay inside ~80% of the canvas. Non-maskable icons can
    # use a slightly larger circle since nothing will crop them.
    radius_ratio = 0.34 if maskable else 0.4
    r = size * radius_ratio
    cx, cy = size / 2, size / 2

    # Draw the gradient circle pixel-row-approximated via concentric bands
    # for performance: compute gradient per-pixel only inside the circle's
    # bounding box.
    x0, y0, x1, y1 = int(cx - r), int(cy - r), int(cx + r), int(cy + r)
    for y in range(y0, y1):
        for x in range(x0, x1):
            if (x - cx) ** 2 + (y - cy) ** 2 <= r * r:
                img.putpixel((x, y), gradient_color(x, y, size, size) + (255,))

    # Monogram
    font_size = int(size * 0.28)
    font = ImageFont.truetype(FONT_PATH, font_size)
    text = "LD"
    bbox = draw.textbbox((0, 0), text, font=font)
    tw, th = bbox[2] - bbox[0], bbox[3] - bbox[1]
    draw.text((cx - tw / 2 - bbox[0], cy - th / 2 - bbox[1]), text, font=font, fill=(255, 255, 255, 255))

    if filename:
        img.convert("RGB").save(filename, "PNG")
    return img


make_icon(192, maskable=False, filename="icon-192.png")
make_icon(512, maskable=False, filename="icon-512.png")
make_icon(192, maskable=True, filename="icon-maskable-192.png")
make_icon(512, maskable=True, filename="icon-maskable-512.png")
make_icon(180, maskable=False, filename="apple-touch-icon.png")
make_icon(32, maskable=False, filename="favicon-32.png")
print("done")
