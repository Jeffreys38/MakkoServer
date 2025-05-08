import { chromium } from 'playwright';
import axios from 'axios';
import fs from 'fs';
import path from 'path';
import { randomInt } from 'crypto';
import { promisify } from 'util';
import Makko from "../../../Makko.ts";

const sleep = promisify(setTimeout);

class KeyFinder {
    private static extractKey(urlData: string[]): string | null {
        const pattern = /userKey=([a-f\d]{64})/;
        const allUrls = urlData.join('');
        const keys = allUrls.match(pattern);
        return keys ? keys[1] : null;
    }

    private static async getUrlData(): Promise<string> {
        const response = await axios.get('https://image-generation.perchance.org/api/verifyUser?thread=2&__cacheBust=0.26325166217456586')
        const key = response.data.userKey;

        return key;
    }

    static async getKey(userKey?: string): Promise<string> {
        let key: string | null = null;

        if (userKey) {
            key = userKey;
            Makko.getLogger().info(`Using passed key ${key.slice(0, 10)}...`);
        } else {
            // Existing logic for getting key from file or generating new one
            const filePath = path.join(__dirname, 'last-key.txt');
            try {
                const line = fs.readFileSync(filePath, 'utf8').trim();
                if (line) {
                    const verificationUrl = 'https://image-generation.perchance.org/api/checkVerificationStatus';
                    const cacheBust = randomInt(0, 1000000);
                    const verificationParams = { userKey: line, __cacheBust: cacheBust.toString() };

                    const response = await axios.get(verificationUrl, { params: verificationParams });
                    if (response.data.status && !response.data.status.includes('not_verified')) {
                        key = line;
                    }
                }
            } catch (error) {
                Makko.getLogger().error("When loading last-key.txt: " + error);
            }

            if (!key) {
                Makko.getLogger().info('Key no longer valid or not found. Looking for a new key...');
                key = await this.getUrlData();
                fs.writeFileSync(filePath, key);
            }
        }

        Makko.getLogger().info(`Found key ${key.slice(0, 10)}...`);
        return key;
    }
}

export default KeyFinder;
