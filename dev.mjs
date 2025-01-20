import { watch } from 'fs';
import { build } from './build.mjs';
import express from 'express';

watch('src', { recursive: true }, build);

express().use(express.static('dist')).listen(8080, () => {
  console.log('Server started at http://localhost:8080');
});
