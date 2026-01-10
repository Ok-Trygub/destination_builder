import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import * as path from "path";

export default defineConfig({
    plugins: [react()],
    base: "/",
    css: {
        devSourcemap: true,
    },
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "src"),
            "@components": path.resolve(__dirname, "src/components"),
            "@pages": path.resolve(__dirname, "src/pages"),
            "@enums": path.resolve(__dirname, "src/enums"),
            "@helpers": path.resolve(__dirname, "src/helpers"),
            "@styles": path.resolve(__dirname, "src/styles"),
            "@assets": path.resolve(__dirname, "src/assets"),
        },
    },
})
