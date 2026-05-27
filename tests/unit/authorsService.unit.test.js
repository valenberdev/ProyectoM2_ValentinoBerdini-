jest.mock("../../db/pool", () => ({
  query: jest.fn(),
}));

const pool = require("../../db/pool");
const authorsService = require("../../services/authorsService");

describe("authorsService (unit)", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("getAllAuthors devuelve rows", async () => {
    const rows = [{ id: 1, name: "Ana" }];
    pool.query.mockResolvedValue({ rows });

    const result = await authorsService.getAllAuthors();

    expect(pool.query).toHaveBeenCalledWith("SELECT * FROM authors");
    expect(result).toEqual(rows);
  });

  test("getAuthorById devuelve primer row", async () => {
    const row = { id: 2, name: "Carlos" };
    pool.query.mockResolvedValue({ rows: [row] });

    const result = await authorsService.getAuthorById(2);

    expect(pool.query).toHaveBeenCalledWith("SELECT * FROM authors WHERE id = $1", [2]);
    expect(result).toEqual(row);
  });

  test("create inserta y devuelve autor creado", async () => {
    const data = { name: "Nuevo", email: "nuevo@mail.com", bio: "bio" };
    const created = { id: 3, ...data };
    pool.query.mockResolvedValue({ rows: [created] });

    const result = await authorsService.create(data);

    expect(pool.query).toHaveBeenCalledWith(
      "INSERT INTO authors (name, email, bio) VALUES ($1, $2, $3) RETURNING *",
      [data.name, data.email, data.bio]
    );
    expect(result).toEqual(created);
  });

  test("update devuelve null cuando no hay filas", async () => {
    pool.query.mockResolvedValue({ rows: [] });

    const result = await authorsService.update(999, {
      name: "X",
      email: "x@mail.com",
      bio: "X",
    });

    expect(result).toBeNull();
  });

  test("remove devuelve true cuando rowCount > 0", async () => {
    pool.query.mockResolvedValue({ rowCount: 1 });

    const result = await authorsService.remove(1);

    expect(pool.query).toHaveBeenCalledWith("DELETE FROM authors WHERE id = $1", [1]);
    expect(result).toBe(true);
  });
});
