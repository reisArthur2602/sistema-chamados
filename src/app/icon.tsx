import { ImageResponse } from 'next/og';

export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

const PRIMARY = '#d97706';

export default function Icon() {
    return new ImageResponse(
        (
            <div
                style={{
                    width: 32,
                    height: 32,
                    borderRadius: 8,
                    backgroundColor: PRIMARY,
                    display: 'flex',
                    position: 'relative',
                }}
            >
                {/* Ticket body */}
                <div
                    style={{
                        position: 'absolute',
                        left: 6,
                        top: 11,
                        width: 13,
                        height: 10,
                        borderRadius: 2,
                        backgroundColor: 'rgba(255,255,255,0.95)',
                    }}
                />
                {/* Ticket stub */}
                <div
                    style={{
                        position: 'absolute',
                        left: 20,
                        top: 11,
                        width: 6,
                        height: 10,
                        borderRadius: 2,
                        backgroundColor: 'rgba(255,255,255,0.55)',
                    }}
                />
                {/* Line 1 */}
                <div
                    style={{
                        position: 'absolute',
                        left: 9,
                        top: 13.5,
                        width: 6,
                        height: 1.5,
                        borderRadius: 1,
                        backgroundColor: PRIMARY,
                    }}
                />
                {/* Line 2 */}
                <div
                    style={{
                        position: 'absolute',
                        left: 9,
                        top: 17,
                        width: 4,
                        height: 1.5,
                        borderRadius: 1,
                        backgroundColor: PRIMARY,
                    }}
                />
            </div>
        ),
        { ...size },
    );
}
