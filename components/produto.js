import { Pressable, Text, StyleSheet } from 'react-native';

export function Produto({ data }) {
  return (
    <Pressable style={styles.container} >
      <Text style={styles.text}>
        {data.quantidade} - {data.nome}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#CECECE",
    padding: 24,
    borderRadius: 5,
    gap: 12,
    flexDirection: "row",
  },
  text: {
    flex: 1,
  },
});
