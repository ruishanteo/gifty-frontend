import { View } from "react-native";
import { Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import Layout from "../components/Layout";

export const TNC = ({ navigation }) => {
  return (
    <SafeAreaView>
      <Layout
        title="Terms and Conditions"
        iconName="chevron-left"
        onAction={() => navigation.goBack()}
      >
        <View style={{ marginHorizontal: 15 }}>
          <Text>
            Ullamco cupidatat mollit fugiat aliquip voluptate magna ipsum
            ullamco dolor amet minim. Lorem sint consequat veniam Lorem ea
            aliqua. Elit est et anim ullamco dolore ad veniam minim esse ullamco
            nisi irure proident. Adipisicing minim aute incididunt dolore mollit
            occaecat sunt proident cupidatat veniam eu voluptate eu ut. Aliqua
            occaecat duis tempor aute incididunt culpa et aliquip quis nulla
            dolore. In quis consequat sit eu exercitation do.Enim do do
            consectetur eu deserunt. Dolore adipisicing ea reprehenderit anim et
            dolor ad cupidatat amet. Dolore irure id enim duis laborum
            incididunt ad ut nulla nisi magna et. Lorem ipsum exercitation culpa
            labore. Irure duis sint ea sint dolore excepteur esse pariatur velit
            eiusmod mollit. Excepteur voluptate id duis veniam officia laborum
            fugiat tempor mollit occaecat. Exercitation et laborum deserunt
            deserunt sunt deserunt dolore consectetur consectetur magna ad
            reprehenderit cillum. Lorem laborum ut ad consequat pariatur fugiat
            laboris in ullamco. Voluptate reprehenderit minim sunt esse laboris
            culpa duis. Consequat aliquip pariatur occaecat occaecat ullamco.
            Mollit et consequat aliquip magna. Ipsum incididunt aliqua ea qui
            velit labore cupidatat anim mollit mollit. Consectetur ex officia
            anim laborum cupidatat. Reprehenderit consequat voluptate est aliqua
            elit aliqua sunt culpa et quis laboris reprehenderit. Ut aliquip qui
            elit duis ea aliqua veniam. Reprehenderit nostrud id Lorem duis
            cupidatat ea. Sint ut sint aliqua sunt exercitation cupidatat labore
            eu enim reprehenderit eu nulla incididunt. Id velit sunt laboris
            aliqua ea consectetur ex. Officia non quis elit enim ipsum pariatur
            minim culpa cupidatat ea ipsum. Occaecat incididunt deserunt
            voluptate velit fugiat incididunt. Elit consequat magna sit tempor
            aliqua minim quis minim nostrud pariatur reprehenderit ad mollit
            aliquip. Consequat nulla sunt Lorem nisi nulla enim culpa mollit
            eiusmod deserunt elit. Et velit quis deserunt laboris eu aute fugiat
            est ut sit sint veniam et. Incididunt sunt commodo voluptate
            consequat aliquip ut laboris laboris ea ut ex excepteur anim. Fugiat
            esse sunt irure magna.
          </Text>
        </View>
      </Layout>
    </SafeAreaView>
  );
};
