import os
import sys

import imageio.v3 as iio


def main() -> int:
    video = sys.argv[1] if len(sys.argv) > 1 else r"e:\2.820LAB\kursor\blockline-site\public\IMG_1698.MP4"
    out_dir = (
        sys.argv[2]
        if len(sys.argv) > 2
        else r"e:\2.820LAB\kursor\blockline-site\assets\mobile-video-frames"
    )
    os.makedirs(out_dir, exist_ok=True)

    # imageio's v3 API expects integer frame indices; convert from seconds using fps.
    meta = {}
    try:
        meta = iio.immeta(video)
    except Exception:
        meta = {}
    fps = None
    for k in ("fps", "average_rate", "r_frame_rate"):
        v = meta.get(k)
        if v:
            try:
                fps = float(v)  # some backends may provide numeric
                break
            except Exception:
                pass
    if not fps:
        # safe fallback
        fps = 30.0

    times = [0.5, 1.5, 3.0, 5.0, 7.5, 10.0]
    wrote = 0

    for t in times:
        idx = max(0, int(round(t * fps)))
        try:
            frame = iio.imread(video, index=idx)
        except Exception as e:
            print(f"skip t={t} (idx={idx}): {e}")
            continue
        path = os.path.join(out_dir, f"t{t:.1f}.png")
        iio.imwrite(path, frame)
        print("wrote", path)
        wrote += 1

    if wrote == 0:
        print("No frames written. Try different timestamps or check codec support.")
        return 2
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

