import 'dotenv/config'
import fs from "fs";
import { initializeApp } from 'firebase/app';
import { getStorage } from "firebase/storage";
import { initializeFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { connectDatabaseEmulator } from "firebase/database";
import { connectAuthEmulator, getAuth } from 'firebase/auth';
import { connectStorageEmulator } from "@firebase/storage";

import Makko from "./Makko";
import Mailer from "./app/mail/Mailer";

class DatabaseInfo {
    public app: any;
    public storage: any;
    public auth: any;
    public db: any;

    constructor() {
        if (!process.env.DB_API_KEY) {
            Makko.getLogger().error("DB_API_KEY variables not set in .env");
            process.exit(1);
        }
        if (!process.env.DB_AUTH_DOMAIN) {
            Makko.getLogger().error("DB_AUTH_DOMAIN variables not set in .env");
            process.exit(1);
        }
        if (!process.env.DB_PROJECT_ID) {
            Makko.getLogger().error("DB_PROJECT_ID variables not set in .env");
            process.exit(1);
        }
        if (!process.env.DB_STORAGE_BUCKET) {
            Makko.getLogger().error("DB_STORAGE_BUCKET variables not set in .env");
            process.exit(1);
        }
        if (!process.env.DB_MESSAGING_SENDER_ID) {
            Makko.getLogger().error("DB_MESSAGING_SENDER_ID variables not set in .env");
            process.exit(1);
        }

        this.app = initializeApp({
            apiKey: process.env.DB_API_KEY,
            authDomain: process.env.DB_AUTH_DOMAIN,
            projectId: process.env.DB_PROJECT_ID,
            storageBucket: process.env.DB_STORAGE_BUCKET,
            messagingSenderId: process.env.DB_MESSAGING_SENDER_ID,
            appId: process.env.DB_APP_ID,
            measurementId: process.env.DB_MEASUREMENT_ID
        })

        this.db = initializeFirestore(this.app, {
            experimentalAutoDetectLongPolling: true
        });
        this.storage = getStorage(this.app);
        this.auth = getAuth(this.app);
    }
}

class Config {
    public firebase: DatabaseInfo = new DatabaseInfo();
    public mailer: Mailer = new Mailer();
    public companyName: string = "Makko";

    public environment: string = process.env.NODE_ENV || "development";
    public port: number = 3000;

    constructor() {
        if (this.environment === "development") {
            connectAuthEmulator(this.firebase.auth, "http://localhost:9099");
            connectFirestoreEmulator(this.firebase.db, "localhost", 8080);
            connectStorageEmulator(this.firebase.storage, "localhost", 9199);
            connectDatabaseEmulator(this.firebase.db, "localhost", 9000);
            Makko.getLogger().info("Connected to Firebase emulator");
        }
    }
}

export default Config;
