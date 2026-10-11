#!/usr/bin/env node
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';
import { main } from './scripts/asistente.mjs';

await main({ root: dirname(fileURLToPath(import.meta.url)) });
