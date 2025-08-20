import { Pressable, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export function Produto({ data, onDelete, onSelect, isSelected }) {
    return (
        <Pressable 
            style={[styles.container, isSelected && styles.containerSelecionado]} 
            onPress={onSelect}
        >
            <Text style={styles.text}>
                {data.quantidade} - {data.nome}
            </Text>
            <TouchableOpacity onPress={onDelete} >
                <MaterialIcons name="delete" size={24} color="red" />
            </TouchableOpacity>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#CECECE",
        padding: 20,
        borderRadius: 50,
        gap: 12,
        flexDirection: "row",
        borderWidth: 2,
        borderColor: 'transparent',
    },
    containerSelecionado: {
        borderColor: '#007AFF',
        backgroundColor: "#E3F2FD",
    },
    text: {
        flex: 1,
    },
});