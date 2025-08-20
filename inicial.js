import { View, Button, StyleSheet, TextInput, Alert, FlatList } from 'react-native';
import { useEffect, useState } from 'react';
import { usarBD } from './hooks/usarBD';
import { Produto } from './components/produto';

export function Index() {
    const [id, setId] = useState('');
    const [nome, setNome] = useState('');
    const [quantidade, setQuantidade] = useState('');
    const [pesquisa, setPesquisa] = useState('');
    const [produtos, setProdutos] = useState([]);
    const [produtoSelecionado, setProdutoSelecionado] = useState(null); // Novo estado para produto selecionado

    const produtosBD = usarBD();

    async function create() {
        if (isNaN(quantidade)) {
            return Alert.alert('Quantidade', 'A quantidade precisa ser um número!');
        }
        try {
            const item = await produtosBD.create({
                nome,
                quantidade,
            });
            Alert.alert('Produto cadastrado com o ID: ' + item.idProduto);
            setId(item.idProduto);
            limparCampos();
            listar();
        } catch (error) {
            console.log(error);
        }
    };

    async function update() {
        if (!produtoSelecionado) return;
        
        if (isNaN(quantidade)) {
            return Alert.alert('Quantidade', 'A quantidade precisa ser um número!');
        }
        try {
            await produtosBD.update(produtoSelecionado.id, {
                nome,
                quantidade,
            });
            Alert.alert('Produto atualizado com sucesso!');
            limparCampos();
            listar();
        } catch (error) {
            console.log(error);
        }
    };

    function limparCampos() {
        setNome('');
        setQuantidade('');
        setProdutoSelecionado(null);
    }

    function selecionarProduto(produto) {
        setProdutoSelecionado(produto);
        setNome(produto.nome);
        setQuantidade(produto.quantidade.toString());
    }

    async function listar() {
        try {
            const captura = await produtosBD.read(pesquisa)
            setProdutos(captura)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        listar();
    }, [pesquisa]);

    const remove = async (id) => {
        try {
            await produtosBD.remove(id);
            if (produtoSelecionado && produtoSelecionado.id === id) {
                limparCampos();
            }
            await listar();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <View style={styles.container}>
            <TextInput style={styles.texto} placeholder="Nome" onChangeText={setNome} value={nome} />
            <TextInput style={styles.texto} placeholder="Quantidade" onChangeText={setQuantidade} value={quantidade} />
            
            <View style={styles.botoesContainer}>
                <Button title="Salvar" onPress={produtoSelecionado ? update : create} />
                {produtoSelecionado && (
                    <Button title="Cancelar" onPress={limparCampos} color="#999" />
                )}
            </View>

            <TextInput style={styles.texto} placeholder="Pesquisar" onChangeText={setPesquisa} />
            <FlatList
                contentContainerStyle={styles.listContent}
                data={produtos}
                keyExtractor={(item) => String(item.id)}
                renderItem={({ item }) =>
                    <Produto 
                        data={item} 
                        onDelete={() => remove(item.id)}
                        onSelect={() => selecionarProduto(item)}
                        isSelected={produtoSelecionado?.id === item.id}
                    />}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 52,
        gap: 16,
    },
    texto: {
        height: 54,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: "#999",
        paddingHorizontal: 16,
    },
    listContent: {
        gap: 12,
    },
    botoesContainer: {
        flexDirection: 'row',
        gap: 12,
        justifyContent: 'center',
    },
});