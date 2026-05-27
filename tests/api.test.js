const request = require("supertest");
const app = require("../app");
const pool = require("../db/pool");

describe("Authors API", () => {
  let authorId;
  let authorEmail;

  test("POST /authors - crea un nuevo autor", async () => {
    const email = `test${Date.now()}@example.com`;
    const res = await request(app).post("/authors").send({ name: "Test Author", email });
    expect(res.status).toBe(201);
    authorId = res.body.id;
    authorEmail = email;
  });

  test("POST /authors - email duplicado da 409", async () => {
    const res = await request(app).post("/authors").send({ name: "Duplicated", email: authorEmail });
    expect(res.status).toBe(409);
  });

  test("GET /authors/:id - obtiene un autor por su ID", async () => {
    const res = await request(app).get(`/authors/${authorId}`);
    expect(res.status).toBe(200);
    expect(res.body.name).toBe("Test Author");
  });

  test("GET /authors/:id - ID inválido da 400", async () => {
    const res = await request(app).get("/authors/abc");
    expect(res.status).toBe(400);
  });

  test("DELETE /authors/:id - inexistente da 404", async () => {
    const res = await request(app).delete("/authors/99999");
    expect(res.status).toBe(404);
  });

  test("DELETE /authors/:id - elimina un autor real", async () => {
    const email = `delete-${Date.now()}@example.com`;
    const createRes = await request(app).post("/authors").send({
      name: "Delete Author",
      email,
    });
    expect(createRes.status).toBe(201);

    const deleteRes = await request(app).delete(`/authors/${createRes.body.id}`);
    expect(deleteRes.status).toBe(204);
  });
});

describe("Posts API", () => {
  let authorId;
  let postId;

  test("POST /posts - crear autor para un nuevo post", async () => {
    const res = await request(app).post("/authors").send({
      name: "Post Author",
      email: `post-${Date.now()}@example.com`,
    });
    expect(res.status).toBe(201);
    authorId = res.body.id;
  });

  test("POST /posts - crea un nuevo post", async () => {
    const res = await request(app).post("/posts").send({
      title: "Test Post",
      content: "This is a test post.",
      author_id: authorId,
      published: false,
    });
    expect(res.status).toBe(201);
    postId = res.body.id;
    expect(res.body.title).toBe("Test Post");
  });

  test("GET /posts/author/:authorId - lista posts por autor", async () => {
    const res = await request(app).get(`/posts/author/${authorId}`);
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test("GET /posts/author/:authorId - ID inválido da 400", async () => {
    const res = await request(app).get("/posts/author/abc");
    expect(res.status).toBe(400);
  });

  test("GET /posts/:id - ID inválido da 400", async () => {
    const res = await request(app).get("/posts/abc");
    expect(res.status).toBe(400);
  });

  test("GET /posts/:id/comments - obtiene comentarios", async () => {
    const res = await request(app).get(`/posts/${postId}/comments`);
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test("POST /posts/:id/comments - crea comentario", async () => {
    const res = await request(app).post(`/posts/${postId}/comments`).send({
      author_id: authorId,
      content: "Comentario de prueba",
    });
    expect(res.status).toBe(201);
    expect(res.body.content).toBe("Comentario de prueba");
  });

  test("POST /posts/:id/comments - body inválido da 400", async () => {
    const res = await request(app).post(`/posts/${postId}/comments`).send({
      content: "Falta author_id",
    });
    expect(res.status).toBe(400);
  });

  test("GET /posts/:id/comments - ID inválido da 400", async () => {
    const res = await request(app).get("/posts/abc/comments");
    expect(res.status).toBe(400);
  });
});

afterAll(async () => {
  await pool.end();
});
