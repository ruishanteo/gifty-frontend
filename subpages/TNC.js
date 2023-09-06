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
            {`
Last Updated: 6th September 2023

Welcome to Gifty! These terms and conditions ("Terms") govern your use of the Gifty mobile application ("App") and the services provided by Gifty ("Services"). By using the App and Services, you agree to comply with and be bound by these Terms. If you do not agree with these Terms, please do not use the App and Services.


1. Acceptance of Terms

By using Gifty, you acknowledge that you have read, understood, and agree to these Terms and our Privacy Policy. If you are using Gifty on behalf of an organization, you represent and warrant that you have the authority to bind that organization to these Terms.

2. Description of Gifty

Gifty is a mobile application that allows users to browse and compile product listings from various e-commerce platforms, including but not limited to Shopee, Amazon, Lazada, and others. Users can create wish lists, save product listings, and interact with the content.

3. Use of the App and Services

You must be at least 18 years old or the legal age of majority in your jurisdiction to use Gifty.
You agree to use the App and Services only for lawful purposes and in compliance with all applicable laws and regulations.
You are responsible for maintaining the security of your account and password.

4. User Content

Gifty allows users to create wish lists and interact with product listings. By using the App and Services, you grant Gifty a non-exclusive, royalty-free, worldwide, transferable, and sublicensable right to use, store, display, reproduce, and distribute your user-generated content for the purpose of providing the Services.

5. Intellectual Property

All content, trademarks, logos, and intellectual property displayed on Gifty are the property of Gifty or its licensors. You may not use, reproduce, or distribute any content from Gifty without prior written permission.

6. Privacy

We take your privacy seriously. Please review our Privacy Policy to understand how we collect, use, and protect your personal information.

7. Disclaimers

Gifty does not endorse, warrant, or guarantee the accuracy or availability of product listings from third-party e-commerce platforms.
Gifty is not responsible for the quality, safety, or legality of products listed on the App.
Gifty is not affiliated with or endorsed by the e-commerce platforms whose listings are compiled in the App.
8. Termination

We reserve the right to terminate or suspend your access to the App and Services at our discretion, without notice, for any reason, including if you violate these Terms.

9. Changes to Terms

Gifty may update these Terms from time to time. We will notify you of any changes by posting the new Terms on the App. Your continued use of the App and Services after the changes become effective constitutes your acceptance of the updated Terms.

10. Contact Us

If you have any questions or concerns about these Terms or the App, please contact us at gifty.discover@gmail.com.
`}
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
