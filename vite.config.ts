import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

export default () => {

    return defineConfig({
        build: {
            outDir: './build'
        },
        plugins: [
            react({
                exclude: /\.stories\.(t|j)sx?$/,
                include: '**/*.tsx',
            }),
            tsconfigPaths(),
        ],
    })
}
