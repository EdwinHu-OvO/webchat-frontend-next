const { heroui } = require("@heroui/react")

/** @type {import('tailwindcss').Config} */
module.exports = {
    plugins: [
        heroui({
            "themes": {
                "light": {
                    "colors": {
                        "default": {
                            "50": "#fafafa",
                            "100": "#f2f2f3",
                            "200": "#ebebec",
                            "300": "#e3e3e6",
                            "400": "#dcdcdf",
                            "500": "#d4d4d8",
                            "600": "#afafb2",
                            "700": "#8a8a8c",
                            "800": "#656567",
                            "900": "#404041",
                            "foreground": "#000",
                            "DEFAULT": "#d4d4d8"
                        },
                        "primary": {
                            "50": "#e4f8fe",
                            "100": "#beeefd",
                            "200": "#97e3fb",
                            "300": "#71d9fa",
                            "400": "#4bcff8",
                            "500": "#25c5f7",
                            "600": "#1fa3cc",
                            "700": "#1880a1",
                            "800": "#125e75",
                            "900": "#0b3b4a",
                            "foreground": "#fff",
                            "DEFAULT": "#25c5f7"
                        },
                        "secondary": {
                            "50": "#e2f9f9",
                            "100": "#b8f1f1",
                            "200": "#8fe8e8",
                            "300": "#66e0e0",
                            "400": "#3cd7d7",
                            "500": "#13cfcf",
                            "600": "#10abab",
                            "700": "#0c8787",
                            "800": "#096262",
                            "900": "#063e3e",
                            "foreground": "#000",
                            "DEFAULT": "#13cfcf"
                        },
                        "success": {
                            "50": "#e0f7e3",
                            "100": "#b5ecbb",
                            "200": "#89e293",
                            "300": "#5ed76b",
                            "400": "#32cc43",
                            "500": "#07c11b",
                            "600": "#069f16",
                            "700": "#057d12",
                            "800": "#035c0d",
                            "900": "#023a08",
                            "foreground": "#000",
                            "DEFAULT": "#07c11b"
                        },
                        "warning": {
                            "50": "#fef7e6",
                            "100": "#fdecc4",
                            "200": "#fbe1a1",
                            "300": "#fad57e",
                            "400": "#f8ca5c",
                            "500": "#f7bf39",
                            "600": "#cc9e2f",
                            "700": "#a17c25",
                            "800": "#755b1b",
                            "900": "#4a3911",
                            "foreground": "#000",
                            "DEFAULT": "#f7bf39"
                        },
                        "danger": {
                            "50": "#f6e5e5",
                            "100": "#e9c1c1",
                            "200": "#dc9d9d",
                            "300": "#d07979",
                            "400": "#c35555",
                            "500": "#b63131",
                            "600": "#962828",
                            "700": "#762020",
                            "800": "#561717",
                            "900": "#370f0f",
                            "foreground": "#fff",
                            "DEFAULT": "#b63131"
                        },
                        "background": "#ffffff",
                        "foreground": "#000000",
                        "content1": {
                            "DEFAULT": "#ffffff",
                            "foreground": "#000"
                        },
                        "content2": {
                            "DEFAULT": "#f4f4f5",
                            "foreground": "#000"
                        },
                        "content3": {
                            "DEFAULT": "#e4e4e7",
                            "foreground": "#000"
                        },
                        "content4": {
                            "DEFAULT": "#d4d4d8",
                            "foreground": "#000"
                        },
                        "focus": "#25c5f7",
                        "overlay": "#000000"
                    }
                },
                "dark": {
                    "colors": {
                        "default": {
                            "50": "#0e0e24",
                            "100": "#1c1c48",
                            "200": "#2a2a6c",
                            "300": "#383890",
                            "400": "#4646b4",
                            "500": "#6b6bc3",
                            "600": "#9090d2",
                            "700": "#b5b5e1",
                            "800": "#dadaf0",
                            "900": "#ffffff",
                            "foreground": "#fff",
                            "DEFAULT": "#4646b4"
                        },
                        "primary": {
                            "50": "#0b3b4a",
                            "100": "#125e75",
                            "200": "#1880a1",
                            "300": "#1fa3cc",
                            "400": "#25c5f7",
                            "500": "#4bcff8",
                            "600": "#71d9fa",
                            "700": "#97e3fb",
                            "800": "#beeefd",
                            "900": "#e4f8fe",
                            "foreground": "#000",
                            "DEFAULT": "#25c5f7"
                        },
                        "secondary": {
                            "50": "#063e3e",
                            "100": "#096262",
                            "200": "#0c8787",
                            "300": "#10abab",
                            "400": "#13cfcf",
                            "500": "#3cd7d7",
                            "600": "#66e0e0",
                            "700": "#8fe8e8",
                            "800": "#b8f1f1",
                            "900": "#e2f9f9",
                            "foreground": "#000",
                            "DEFAULT": "#13cfcf"
                        },
                        "success": {
                            "50": "#023a08",
                            "100": "#035c0d",
                            "200": "#057d12",
                            "300": "#069f16",
                            "400": "#07c11b",
                            "500": "#32cc43",
                            "600": "#5ed76b",
                            "700": "#89e293",
                            "800": "#b5ecbb",
                            "900": "#e0f7e3",
                            "foreground": "#000",
                            "DEFAULT": "#07c11b"
                        },
                        "warning": {
                            "50": "#4a3911",
                            "100": "#755b1b",
                            "200": "#a17c25",
                            "300": "#cc9e2f",
                            "400": "#f7bf39",
                            "500": "#f8ca5c",
                            "600": "#fad57e",
                            "700": "#fbe1a1",
                            "800": "#fdecc4",
                            "900": "#fef7e6",
                            "foreground": "#000",
                            "DEFAULT": "#f7bf39"
                        },
                        "danger": {
                            "50": "#370f0f",
                            "100": "#561717",
                            "200": "#762020",
                            "300": "#962828",
                            "400": "#b63131",
                            "500": "#c35555",
                            "600": "#d07979",
                            "700": "#dc9d9d",
                            "800": "#e9c1c1",
                            "900": "#f6e5e5",
                            "foreground": "#fff",
                            "DEFAULT": "#b63131"
                        },
                        "background": "#ffffff",
                        "foreground": "#ffffff",
                        "content1": {
                            "DEFAULT": "#18181b",
                            "foreground": "#fff"
                        },
                        "content2": {
                            "DEFAULT": "#27272a",
                            "foreground": "#fff"
                        },
                        "content3": {
                            "DEFAULT": "#3f3f46",
                            "foreground": "#fff"
                        },
                        "content4": {
                            "DEFAULT": "#52525b",
                            "foreground": "#fff"
                        },
                        "focus": "#25c5f7",
                        "overlay": "#ffffff"
                    }
                }
            },
            "layout": {
                "disabledOpacity": "0.5"
            }
        })
    ]
}