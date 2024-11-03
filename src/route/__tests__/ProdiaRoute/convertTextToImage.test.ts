import request from 'supertest';
import app from "../../../../app";

describe('POST /api/mail/otp', () => {
    it('should respond with a JSON object', async () => {
        const response = await request(app)
            .post('/api/mail/otp')
            .send({ email: 'quocthangngoc14@gmail.com', receiverName: 'Test User 1' });

        expect(response.status).toBe(200);
    });
});