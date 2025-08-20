import { View, Button, StyleSheet, TextInput } from 'react-native';

export function Index() {

    const [id, setId] = useState('');
    const [nome, setNome] = useState('');
    const [quantidade, setQuantidade] = useState('');
    const [pesquisa, setPesquisa] = useState('');
    const [produtos, setProdutos] = useState([]);

    return (
        <View style={styles.container}>
            <TextInput style={styles.texto} placeholder="Nome" />
            <TextInput style={styles.texto} placeholder="Quantidade" />
            <Button title="Salvar" />
            <TextInput style={styles.texto} placeholder="Pesquisar" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 32,
        gap: 16,
    },
    texto: {
        height: 54,
        borderWidth: 1,
        borderRadius: 7,
        borderColor: "#999",
        paddingHorizontal: 16,
    }
});