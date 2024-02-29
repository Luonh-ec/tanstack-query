import {View, Text, Image, StyleSheet} from 'react-native';
import {memo} from 'react';

type Product = {
  id: number;
  name: string;
  image?: string;
};

type ProductCard = {
  product: Product;
};

const ProductCard = ({product}: ProductCard) => {
  return (
    <View style={styles.container}>
      <Image source={{uri: product.image}} style={styles.image} />
      <Text style={styles.name}>{product.name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 80,
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 10,
  },
  name: {
    height: 20,
    fontSize: 16,
    fontWeight: 'bold',
    color: 'darkslategrey',
    alignSelf: 'center',
    marginVertical: 10,
    padding: 20,
  },
  image: {
    width: '100%',
    aspectRatio: 1,
  },
});

export default memo(ProductCard);
