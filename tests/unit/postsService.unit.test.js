jest.mock("../../db/pool", () => ({
  query: jest.fn(),
}));

const pool = require("../../db/pool");
const postsService = require("../../services/postsService");

describe("postsService (unit)", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("getPostsByAuthor filtra por author_id", async () => {
    const rows = [{ id: 1, author_id: 10 }];
    pool.query.mockResolvedValue({ rows });

    const result = await postsService.getPostsByAuthor(10);

    expect(pool.query).toHaveBeenCalledWith("SELECT * FROM posts WHERE author_id = $1", [10]);
    expect(result).toEqual(rows);
  });

  test("create usa published=false por defecto", async () => {
    const data = { title: "T", content: "C", author_id: 1 };
    const created = { id: 50, ...data, published: false };
    pool.query.mockResolvedValue({ rows: [created] });

    const result = await postsService.create(data);

    expect(pool.query).toHaveBeenCalledWith(
      "INSERT INTO posts (title, content, author_id, published) VALUES ($1, $2, $3, $4) RETURNING *",
      [data.title, data.content, data.author_id, false]
    );
    expect(result).toEqual(created);
  });

  test("update devuelve fila actualizada", async () => {
    const updated = {
      id: 7,
      title: "Updated",
      content: "Updated",
      author_id: 1,
      published: true,
    };
    pool.query.mockResolvedValue({ rows: [updated] });

    const result = await postsService.update(7, updated);

    expect(pool.query).toHaveBeenCalledWith(
      "UPDATE posts SET title = $1, content = $2, author_id = $3, published = $4 WHERE id = $5 RETURNING *",
      [updated.title, updated.content, updated.author_id, updated.published, 7]
    );
    expect(result).toEqual(updated);
  });

  test("remove devuelve false cuando no borra filas", async () => {
    pool.query.mockResolvedValue({ rowCount: 0 });

    const result = await postsService.remove(999);

    expect(result).toBe(false);
  });
});
