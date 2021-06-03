import React, { useEffect } from "react";
import { Switch } from "react-native";
import { Controller, useForm } from "react-hook-form";
import Toast from "react-native-root-toast";
import { Box, Button, Input, ScreenContainer, Text } from "../../Components";
import Divider from "../../Components/Divider/Divider";
import { emailRegexPattern, numRegexPattern } from "../../constants";
import theme from "../../Theme";
import { useGetSettingsData } from "../../Hooks";
import useUpdateSettings from "../../Hooks/useUpdateSettings";
import useLogout from "../../Hooks/useLogout";

const SettingsScreen: React.FC = () => {
  const { data } = useGetSettingsData();
  const { updateSettings } = useUpdateSettings();
  const { logout } = useLogout();

  const {
    control,
    handleSubmit,
    formState: { errors, isDirty },
    setValue,
  } = useForm();

  useEffect(() => {
    if (data) {
      const { user } = data;
      setValue("email", user?.email);
      setValue("pomodoro", user?.settings.pomoLength.toString());
      setValue("shortBreak", user?.settings.shortBreakLength.toString());
      setValue("longBreak", user?.settings.longBreakLength.toString());
      setValue("alarmOn", user?.settings.isAlarmSound);
    }
  }, [data]);

  const onSubmit = async (submittedData: any) => {
    try {
      const { email, pomodoro, shortBreak, longBreak, alarmOn } = submittedData;
      await updateSettings(
        email,
        parseInt(pomodoro, 10),
        parseInt(shortBreak, 10),
        parseInt(longBreak, 10),
        Boolean(alarmOn)
      );
      Toast.show("Settings updated", {
        backgroundColor: theme.colors.primary500,
        textStyle: {
          fontSize: 18,
        },
      });
    } catch (e) {
      Toast.show(e.toString(), {
        backgroundColor: theme.colors.red500,
        textStyle: {
          fontSize: 18,
        },
      });
    }
  };

  return (
    <ScreenContainer scroll>
      <Box paddingTop="xxxl" paddingHorizontal="xl">
        <Box
          justifyContent="space-between"
          flexDirection="row"
          alignItems="center"
        >
          <Text variant="3xl" fontFamily="Inter_700Bold">
            Settings
          </Text>
          <Button
            py="sm"
            px="md"
            onPress={handleSubmit(onSubmit)}
            disabled={!isDirty}
          >
            Save
          </Button>
        </Box>
        <Divider marginVertical="md" />
        <Box>
          <Text
            variant="xl"
            color="gray400"
            fontFamily="Inter_700Bold"
            marginBottom="md"
          >
            Account
          </Text>
          <Box height={100}>
            <Controller
              control={control}
              name="email"
              rules={{ required: true, pattern: emailRegexPattern }}
              render={({ field: { onChange, value } }) => (
                <Input
                  label="Email"
                  placeholder="test@test.com"
                  value={value}
                  onChangeText={onChange}
                  variant={errors.email ? "error" : undefined}
                  message={
                    errors.email ? "You must have a valid email!" : undefined
                  }
                />
              )}
            />
          </Box>
        </Box>
        <Divider marginVertical="md" />
        <Text variant="xl" color="gray400" fontFamily="Inter_700Bold">
          Timer
        </Text>
        <Text
          variant="md"
          color="gray700"
          fontFamily="Inter_600SemiBold"
          marginTop="md"
        >
          Time (minutes)
        </Text>
        <Box marginTop="sm">
          <Controller
            control={control}
            name="pomodoro"
            rules={{ required: true, pattern: numRegexPattern }}
            render={({ field: { onChange, value } }) => (
              <Input
                label="Pomodoro"
                placeholder="25"
                value={value}
                onChangeText={onChange}
                variant={errors.pomodoro ? "error" : undefined}
                message={errors.pomodoro ? "This must be a number" : undefined}
              />
            )}
          />
          <Controller
            control={control}
            name="shortBreak"
            rules={{ required: true, pattern: numRegexPattern }}
            render={({ field: { onChange, value } }) => (
              <Input
                label="Short Break"
                placeholder="5"
                value={value}
                onChangeText={onChange}
                variant={errors.shortBreak ? "error" : undefined}
                message={
                  errors.shortBreak ? "This must be a number" : undefined
                }
              />
            )}
          />
          <Controller
            control={control}
            name="longBreak"
            rules={{ required: true, pattern: numRegexPattern }}
            render={({ field: { onChange, value } }) => (
              <Input
                label="Long Break"
                placeholder="30"
                value={value}
                onChangeText={onChange}
                variant={errors.longBreak ? "error" : undefined}
                message={errors.longBreak ? "This must be a number" : undefined}
              />
            )}
          />
        </Box>
        <Box
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Text variant="md" fontFamily="Inter_600SemiBold">
            Alarm On
          </Text>
          <Controller
            control={control}
            name="alarmOn"
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => (
              <Switch value={value} onValueChange={onChange} />
            )}
          />
        </Box>
        <Button
          backgroundColor="red500"
          onPress={() => logout()}
          marginTop="lg"
        >
          Log Out
        </Button>
      </Box>
    </ScreenContainer>
  );
};

export default SettingsScreen;
