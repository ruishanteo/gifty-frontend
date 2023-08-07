import * as React from "react";
import { Dimensions, FlatList, SafeAreaView, View } from "react-native";
import {
  Button,
  IconButton,
  Text,
  TextInput,
  useTheme,
} from "react-native-paper";
import { BottomSheet, ListItem, SearchBar } from "@rneui/themed";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Formik } from "formik";
import * as Yup from "yup";

import { Listing } from "../components/Listing";
import { FilterAccordian } from "../components/FilterAccordian";
import { useListings } from "../api/listing";

export const Explore = ({ navigation }) => {
  const theme = useTheme();

  const [openDrawer, setOpenDrawer] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [allQueries, setAllQueries] = React.useState();
  const { isLoading, data, refetch } = useListings(allQueries);

  React.useEffect(() => {
    refetch();
  }, [refetch, searchQuery, allQueries]);

  const windowWidth = Dimensions.get("window").width;

  if (isLoading) return null;
  const listings = data.listing;

  const onChangeSearch = (query) => {
    setSearchQuery(query);
    setAllQueries({ ...allQueries, search: query });
  };

  const initialValues = {
    orderBy: "",
    search: searchQuery,
    categories: [],
    platform: undefined,
    minPrice: "0",
    maxPrice: "",
  };

  const filterProps = [
    {
      type: "orderBy",
      label: "Sort",
      chips: [
        { display: "Price low", value: "price_asc" },
        { display: "Price high", value: "price_desc" },
      ],
      allowMultiple: false,
    },
    {
      type: "categories",
      label: "Category",
      chips: [
        { display: "electronics", value: "Electronics" },
        { display: "home & garden", value: "Home & Garden" },
        { display: "fashion", value: "Fashion" },
        { display: "toys & hobbies", value: "Toys & Hobbies" },
        { display: "sporting goods", value: "Sporting Goods" },
        { display: "food & drink", value: "Food & Drink" },
        { display: "travel", value: "Travel" },
        { display: "education", value: "Education" },
        { display: "health & beauty", value: "Health & Beauty" },
        { display: "pets", value: "Pets" },
      ],
      allowMultiple: true,
    },
    {
      type: "platform",
      label: "Platform",
      chips: [
        { display: "amazon", value: "Amazon" },
        { display: "etsy", value: "Etsy" },
      ],
      allowMultiple: false,
    },
  ];

  return (
    <Formik
      enableReinitialize
      validationSchema={Yup.object().shape({
        minPrice: Yup.number().min(0).optional(),
        maxPrice: Yup.number()
          .optional()
          .min(0)
          .test(
            "maxPrice",
            "Max price must be greater than min price",
            function (value) {
              return value ? value > this.parent.minPrice : true;
            }
          ),
      })}
      validateOnChange={false}
      validateOnBlur={false}
      initialValues={initialValues}
      onSubmit={(values) => {
        setAllQueries(values);
        setOpenDrawer(false);
      }}
    >
      {({
        handleSubmit,
        handleChange,
        resetForm,
        handleBlur,
        values,
        touched,
        errors,
      }) => (
        <SafeAreaView>
          <View
            style={{ alignItems: "center", width: windowWidth }}
            flexDirection="row"
          >
            <SearchBar
              placeholder="Search"
              onChangeText={onChangeSearch}
              value={values.search}
              containerStyle={{
                backgroundColor: "transparent",
                borderBottomColor: "transparent",
                borderTopColor: "transparent",
              }}
              inputContainerStyle={{
                backgroundColor: theme.colors.primary,
                width: windowWidth - 80,
              }}
              round={true}
            />
            <IconButton
              onPress={() => setOpenDrawer(true)}
              iconColor={theme.colors.secondary}
              icon="tune"
              size={26}
            />
          </View>

          <FlatList
            style={{ height: "100%", marginHorizontal: 15 }}
            data={listings}
            renderItem={({ item }) => (
              <Listing listing={item} navigation={navigation} />
            )}
            keyExtractor={(item) => item.id}
            numColumns={2}
            ItemSeparatorComponent={() => <View style={{ height: "2%" }} />}
            columnWrapperStyle={{ justifyContent: "space-between" }}
          />

          <BottomSheet
            onBackdropPress={() => setOpenDrawer(false)}
            isVisible={openDrawer}
          >
            <KeyboardAwareScrollView>
              <ListItem
                bottomDivider
                containerStyle={{ backgroundColor: theme.colors.background }}
              >
                <View
                  flexDirection="row"
                  style={{
                    flex: 1,
                    alignItems: "center",
                    height: 45,
                  }}
                >
                  <IconButton
                    onPress={() => setOpenDrawer(false)}
                    iconColor={theme.colors.secondary}
                    icon="close"
                  />
                  <Text
                    variant="bodyLarge"
                    style={{
                      flex: 1,
                      textAlign: "center",
                    }}
                  >
                    Filter and Sort
                  </Text>
                  <Button
                    onPress={() => resetForm(initialValues)}
                    textColor={theme.colors.secondary}
                  >
                    Reset
                  </Button>
                </View>
              </ListItem>

              {filterProps.map((filterProp, index) => (
                <FilterAccordian key={index} filterProp={filterProp} />
              ))}

              <ListItem
                bottomDivider
                containerStyle={{ backgroundColor: theme.colors.background }}
              >
                <View flexDirection="column">
                  <ListItem.Title style={{ color: theme.colors.font }}>
                    Price Range ($)
                  </ListItem.Title>
                  <ListItem.Content>
                    <View
                      flexDirection="row"
                      style={{
                        flex: 1,
                        alignItems: "center",
                        gap: 10,
                        marginBottom: 30,
                        marginTop: 10,
                      }}
                    >
                      <TextInput
                        mode="outlined"
                        placeholder="Lowest"
                        style={{ width: "40%" }}
                        onChangeText={handleChange("minPrice")}
                        onBlur={handleBlur("minPrice")}
                        value={values.minPrice}
                        error={errors.minPrice && touched.minPrice}
                      />
                      <Text>-</Text>
                      <TextInput
                        mode="outlined"
                        placeholder="Highest"
                        style={{ width: "40%" }}
                        onChangeText={handleChange("maxPrice")}
                        onBlur={handleBlur("maxPrice")}
                        value={values.maxPrice}
                        error={errors.maxPrice && touched.maxPrice}
                      />
                    </View>
                  </ListItem.Content>
                </View>
              </ListItem>

              <ListItem
                bottomDivider
                containerStyle={{ backgroundColor: theme.colors.background }}
              >
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                    padding: 25,
                  }}
                >
                  <Button
                    onPress={handleSubmit}
                    mode="contained"
                    buttonColor={theme.colors.quaternary}
                    textColor={theme.colors.surface}
                    icon="check"
                  >
                    Done
                  </Button>
                </View>
              </ListItem>
            </KeyboardAwareScrollView>
          </BottomSheet>
        </SafeAreaView>
      )}
    </Formik>
  );
};
