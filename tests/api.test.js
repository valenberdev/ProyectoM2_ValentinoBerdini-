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

  test("POST /authors - email inválido da 400", async () => {
    const res = await request(app).post("/authors").send({
      name: "Autor inválido",
      email: "correo-invalido",
    });
    expect(res.status).toBe(400);
  });

  test("POST /authors - nombre vacío da 400", async () => {
    const res = await request(app).post("/authors").send({
      name: "   ",
      email: `blank-${Date.now()}@example.com`,
    });
    expect(res.status).toBe(400);
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

  test("GET /authors/:id - ID con caracteres mixtos da 400", async () => {
    const res = await request(app).get("/authors/12abc");
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

  test("GET /posts - lista todos los posts", async () => {
    const res = await request(app).get("/posts");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test("GET /posts/:id - obtiene un post por su ID", async () => {
    const res = await request(app).get(`/posts/${postId}`);
    expect(res.status).toBe(200);
    expect(res.body.id).toBe(postId);
  });

  test("GET /posts/:id - devuelve 404 si no existe", async () => {
    const res = await request(app).get("/posts/99999");
    expect(res.status).toBe(404);
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

  test("POST /posts - título vacío da 400", async () => {
    const res = await request(app).post("/posts").send({
      title: "   ",
      content: "Contenido válido",
      author_id: authorId,
      published: false,
    });
    expect(res.status).toBe(400);
  });

  test("POST /posts - author_id inválido da 400", async () => {
    const res = await request(app).post("/posts").send({
      title: "Post inválido",
      content: "Contenido válido",
      author_id: "1",
      published: false,
    });
    expect(res.status).toBe(400);
  });

  test("GET /posts/:id - ID inválido da 400", async () => {
    const res = await request(app).get("/posts/abc");
    expect(res.status).toBe(400);
  });

  test("GET /posts/:id - ID con caracteres mixtos da 400", async () => {
    const res = await request(app).get("/posts/45abc");
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

  test("POST /posts/:id/comments - contenido vacío da 400", async () => {
    const res = await request(app).post(`/posts/${postId}/comments`).send({
      author_id: authorId,
      content: "  ",
    });
    expect(res.status).toBe(400);
  });

  test("GET /posts/:id/comments - ID inválido da 400", async () => {
    const res = await request(app).get("/posts/abc/comments");
    expect(res.status).toBe(400);
  });

  test("PUT /posts/:id - actualiza un post existente", async () => {
    const res = await request(app).put(`/posts/${postId}`).send({
      title: "Test Post Updated",
      content: "Updated content",
      author_id: authorId,
      published: true,
    });
    expect(res.status).toBe(200);
    expect(res.body.title).toBe("Test Post Updated");
    expect(res.body.published).toBe(true);
  });

  test("PUT /posts/:id - devuelve 404 si no existe", async () => {
    const res = await request(app).put("/posts/99999").send({
      title: "No Existe",
      content: "No Existe",
      author_id: authorId,
      published: false,
    });
    expect(res.status).toBe(404);
  });

  test("DELETE /posts/:id - devuelve 404 si no existe", async () => {
    const res = await request(app).delete("/posts/99999");
    expect(res.status).toBe(404);
  });

  test("DELETE /posts/:id - elimina un post existente", async () => {
    const createRes = await request(app).post("/posts").send({
      title: "Post to delete",
      content: "Post to delete content",
      author_id: authorId,
      published: false,
    });
    expect(createRes.status).toBe(201);

    const deleteRes = await request(app).delete(`/posts/${createRes.body.id}`);
    expect(deleteRes.status).toBe(204);
  });
});

afterAll(async () => {
  await pool.end();
});
