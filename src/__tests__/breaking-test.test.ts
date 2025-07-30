describe('Teste que vai falhar para demonstrar CI/CD', () => {
  test('este teste vai falhar propositalmente', () => {
    // Este teste vai falhar para demonstrar que o deploy NÃO deve acontecer
    expect(1 + 1).toBe(3); // Isso vai falhar!
  });

  test('este teste vai passar', () => {
    expect(2 + 2).toBe(4);
  });
}); 