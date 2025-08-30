import React from 'react'
import { StyleSheet, TouchableOpacity, View, Image } from 'react-native'
import { getCategoryIcon } from '../../data/MyData'
import { Tooltip } from 'react-native-paper'
import { useDispatch, useSelector } from 'react-redux';
import { IncrementLoadedCount } from '../../redux/slices/categorySlice';
import { COLORS } from '../../constants/colors'

const CategoryCard = ({ name, isSelected, onToggle }) => {

    const dispatch = useDispatch();
    const { loadedCount } = useSelector(store => store.category)


    const IncrementCategoryCount = () => {
        dispatch(IncrementLoadedCount());
    }

    return (
        <>
            <Tooltip
                title={name}
                enterTouchDelay={200}
                leaveTouchDelay={200}
            >
                <TouchableOpacity
                    onPress={onToggle}
                >
                    <View
                        style={[
                            styles.item,
                            {
                                borderColor: isSelected ? COLORS.border : '#ccc',
                                boxShadow: isSelected
                                    ? `0px 0px 10px 3px ${COLORS.primary}`
                                    : `0px 0px 10px 3px rgba(148, 188, 190, 1)`,
                            },
                        ]}
                    >
                        <Image
                            source={getCategoryIcon(name)}
                            //source={getCategoryIcon(name)}
                            style={{ width: 90, height: 90 }}
                            onLoadEnd={IncrementCategoryCount}

                        />
                    </View>
                </TouchableOpacity>
            </Tooltip>
        </>

    )
}

export default CategoryCard

const styles = StyleSheet.create({
    item: {
        alignItems: 'center',
        margin: 10,
        borderWidth: 1,
        borderRadius: 15
    },
})