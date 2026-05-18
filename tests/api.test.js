const request = require('supertest');
const app = require('../app');

describe('Authors API', () => {
    let authorId;
    let authorEmail;

test('POST /authors - crea un nuevo autor', async () => {
    const email = `test${Date.now()}@example.com`;
    const res = await request(app)
        .post('/authors')
        .send({ name: 'Test Author', email });
    expect(res.status).toBe(201);
    authorId = res.body.id;
    authorEmail = email;
});

test('POST /authors - email duplicado da 409', async () => {
    const res = await request(app)
        .post('/authors')
        .send({ name: 'Duplicated', email: authorEmail });
    expect(res.status).toBe(409);
});

test('GET /authors/:id - obtiene un autor por su ID', async () => {
    const res = await request(app)
        .get(`/authors/${authorId}`)
    expect(res.status).toBe(200);
    expect(res.body.name).toBe('Test Author');
});

test('DELETE /authors/:id - elimina un autor por su ID', async () => {
    const res = await request(app)
        .delete(`/authors/99999`)
    expect(res.status).toBe(404);
});
});


describe('Posts API', () => {
    let authorId;
    let postId;
    const testEmail = `test${Date.now()}@example.com`;

    test('POST /posts - crear autor para un nuevo post', async () => {
        const res = await request(app)
            .post('/authors')
            .send({
                name: 'Post Author',
                email: `test${Date.now()}@example.com`
            });
        authorId = res.body.id;
    });

    test('POST /posts - crea un nuevo post', async () => {
        const res = await request(app)
            .post('/posts')
            .send({
                title: 'Test Post',
                content: 'This is a test post.',
                author_id: authorId
            });
        expect(res.status).toBe(201);
        postId = res.body.id;
        expect(res.body.title).toBe('Test Post');
    }
    );

});
