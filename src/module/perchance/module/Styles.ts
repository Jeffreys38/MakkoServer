
type Style = [string, string];

const styles: Record<string, Style> = {
    'no-style': ['', ''],

    'cinematic': [
        'cinematic shot, dynamic lighting, 75mm, Technicolor, Panavision, cinemascope, sharp focus, fine details, 8k, HDR, realism, realistic, key visual, film still, superb cinematic color grading, depth of field',
        'bad lighting, low-quality, deformed, text, poorly drawn, holding camera, bad art, bad angle, boring, low-resolution, worst quality, bad composition, disfigured'
    ],

    'traditional-japanese': [
        'in ukiyo-e art style, traditional japanese masterpiece',
        'blurry, low resolution, worst quality, fuzzy'
    ],

    'realistic-vintage': [
        'ultra-realistic portrait of a beautiful Western woman, fair skin, soft natural makeup, rosy cheeks, smooth lips, bright blue or green eyes, soft wavy long hair, elegant appearance, wearing a white dress, holding a bouquet of white roses, gentle smile, serene expression, looking upwards, soft and natural lighting, high detail skin texture, cinematic atmosphere, professional studio photography, Fujifilm Pro 400H film, 35mm film photography, high-resolution, fine detail, sharp focus, vintage-inspired colors, warm and muted tones, natural skin tones, subtle grain, nostalgic mood, rich shadows, faded edges, classic 90s color palette, soft focus on edges, depth of field',
        'blurry, low resolution, cartoonish, exaggerated features, overexposed, low-detail background, harsh shadows, unnatural colors, plastic-like skin, washed-out colors, artificial lighting, digital noise, flat colors'
    ],

    'anime': [
        '(anime art of {}:1.2), masterpiece, 4k, best quality, anime art',
        '(worst quality, low quality:1.3), low-quality, deformed, text, poorly drawn, hilariously bad drawing, bad 3D render'
    ]
};

export { styles };