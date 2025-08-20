import { useSQLiteContext } from 'expo-sqlite';

export function usarBD() {
    const bd = useSQLiteContext();

    async function create(dados) {
        const regras = await bd.prepareAsync(
            "INSERT INTO produtos (nome, quantidade) VALUES ($nome, $quantidade)"
        );

        try {
            const result = await regras.executeAsync({
                $nome: dados.nome,
                $quantidade: dados.quantidade,
            });

            const idProduto = result.lastInsertRowId.toLocaleString();

            return { idProduto };
        } catch (error) {
            throw error;
        } finally {
            await regras.finalizeAsync();
        }
    }
    return { create }
}