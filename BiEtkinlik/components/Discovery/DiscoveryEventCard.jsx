import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { appStyles } from '../../constants/styles';
import BiEtkinlik from '../../assets/eventImage/BiEtkinlik.png'
import { API_URL } from '../../constants/api'
import { Avatar } from 'react-native-paper';
import { COLORS } from '../../constants/colors'
import { Tooltip } from 'react-native-paper'
import { useTranslation } from 'react-i18next';
import { getCategoryIcon } from '../../data/MyData';
import { List } from 'react-native-paper';
import { IconButton } from 'react-native-paper';


const DiscoveryEventCard = ({ event }) => {
    const { t: tButton } = useTranslation("button");
    const { t: tTooltip } = useTranslation("tooltip");
    const { t: tText } = useTranslation("text");
    const { t: tCategory } = useTranslation("category");

    const [UserId, setUserId] = useState(null);
    const [expanded, setExpanded] = React.useState(false);
    const [imgError, setImgError] = useState(false);
    const categoryName = event.eventCategories[0].category.categoryName;
    const accordionTitle = `${event.name} - ${categoryName}`;
    const ppImageUrl = !imgError && event.appUser?.profilePhotoId
        ? { uri: `${API_URL}Users/ProfileImage/${event.appUser.profilePhotoId}` }
        : undefined;

    const eventImageUrl = !imgError && event.eventImageId
        ? { uri: `${API_URL}Users/ProfileImage/${event.eventImageId}` }
        : BiEtkinlik;

    useEffect(() => {
        const loadUserId = async () => {
            const id = await AsyncStorage.getItem("UserId");
            if (id) setUserId(id);
        };
        loadUserId();
    }, []);

    const formatDateTime = (dateTime) => {
        const date = new Date(dateTime);
        return date.toLocaleString("tr-TR", {
            day: "numeric",
            month: "long",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    return (
        <>
            <View style={[styles.cardContainer]}>
                <View style={appStyles.flexRowJustifyBetweenAlignStart}>
                    <View style={appStyles.row}>
                        <View>
                            {
                                ppImageUrl ?
                                    <Avatar.Image
                                        size={50}
                                        source={ppImageUrl}
                                        onError={() => setImgError(true)}
                                    />
                                    :
                                    <Avatar.Text
                                        size={50}
                                        label={event.appUser?.firstName?.[0]?.toUpperCase() || "?"}
                                        backgroundColor={COLORS.text}
                                    />
                            }

                        </View>

                        <View style={{ left: 4 }}>
                            <Text>
                                {event.appUser.firstName} {event.appUser.lastName}
                                <Tooltip
                                    title={tTooltip('communityScore')}
                                    enterTouchDelay={200}
                                    leaveTouchDelay={400}
                                >
                                    <Text style={{ top: 3 }}> ({event.appUser.score})</Text>
                                </Tooltip>

                            </Text>
                        </View>
                    </View>

                    <View>
                        <Avatar.Image
                            size={50}
                            source={getCategoryIcon(categoryName)}
                            backgroundColor='#ffffff04'
                        />
                    </View>

                </View>
                <View>
                    <Image style={styles.eventImage}
                        source={eventImageUrl}
                        resizeMode='cover'
                        onError={() => setImgError(true)}
                        alt='Bi Etkinlik'
                    />
                </View>
                <View style={appStyles.flexrRowJustifyStart}>
                    {
                        event.registered ?
                            <IconButton
                                icon="calendar-check"
                                iconColor={COLORS.primary}
                                size={35}
                                disabled
                            />
                            :
                            <IconButton
                                icon="calendar-check-outline"
                                iconColor={COLORS.primary}
                                size={35}
                                onPress={() => console.log('Pressed')}
                            />
                    }

                    <IconButton
                        icon="map-search"
                        iconColor={COLORS.primary}
                        size={35}
                        onPress={() => console.log('Pressed')}
                    />
                </View>
                <View>
                    <List.Section>
                        <List.Accordion
                            title={accordionTitle}
                            expanded={expanded}
                            onPress={() => setExpanded(!expanded)}
                            style={{ backgroundColor: 'whitesmoke', paddingVertical: -10 }}
                            contentStyle={{ height: 30, paddingLeft: 0 }} // daha ince görünüm
                            titleStyle={{ fontSize: 14 }}
                        >
                            <View >
                                <Text>{event.description}</Text>
                                <View style={{ marginTop: 5 }}>
                                    <Text>{tText("city")}: {event.city}</Text>
                                    <Text>{tText("startDate")}: {formatDateTime(event.startDate)}</Text>
                                    <Text>{tText("endDate")}: {formatDateTime(event.endDate)}</Text>
                                </View>
                            </View>

                        </List.Accordion>
                    </List.Section>
                </View>

            </View>
            <View style={styles.separator} />
        </>


    )
}

export default DiscoveryEventCard

const styles = StyleSheet.create({
    cardContainer: {
        width: '100%',
        height: 'auto',
        marginVertical: 10
    },
    separator: {
        borderBottomColor: "#ccc",   // çizgi rengi
        borderBottomWidth: 2,        // kalınlık
        marginVertical: 10,          // üst-alt boşluk
    },
    profilePhoto: {
        width: 60,
        height: 60,
        borderRadius: 30
    },
    eventImage: {
        marginTop: 5,
        width: '100%',
        height: 200,
        borderRadius: 3
    },

})