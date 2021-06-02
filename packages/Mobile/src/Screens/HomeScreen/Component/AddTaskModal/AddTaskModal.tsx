import React from "react";
import { KeyboardAvoidingView, Modal, View } from "react-native";
import { Controller, useForm } from "react-hook-form";
import Toast from "react-native-root-toast";
import { Box, Button, Input, Text } from "../../../../Components";
import { numRegexPattern } from "../../../../constants";
import { useCreateTask } from "../../../../Hooks";
import theme from "../../../../Theme";

type AddTaskModalProps = {
  open: boolean;
  setClose: () => void;
};

const AddTaskModal: React.FC<AddTaskModalProps> = ({ open, setClose }) => {
  const { createTask } = useCreateTask();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any) => {
    try {
      await createTask(data.name, parseInt(data.numPomos, 10));
      setClose();
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
    <Modal visible={open} animationType="slide" transparent>
      <KeyboardAvoidingView
        behavior="padding"
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            backgroundColor: "white",
            height: 350,
            borderRadius: 12,
            padding: 24,
          }}
        >
          <Box backgroundColor="white">
            <Box flexDirection="row" justifyContent="space-between">
              <Box />
              <Box onTouchEnd={setClose}>
                <Text>X</Text>
              </Box>
            </Box>
            <Controller
              control={control}
              name="name"
              rules={{ required: true }}
              defaultValue=""
              render={({ field: { onChange, value } }) => (
                <Input
                  label="Task Name"
                  placeholder="Task Name"
                  value={value}
                  onChangeText={onChange}
                  variant={errors.name ? "error" : undefined}
                  message={
                    errors.name ? "You must add a task name!" : undefined
                  }
                />
              )}
            />
            <Controller
              control={control}
              name="numPomos"
              rules={{ required: true, pattern: numRegexPattern }}
              defaultValue=""
              render={({ field: { onChange, value } }) => (
                <Input
                  label="Est. Pomodoros"
                  placeholder="1"
                  value={value}
                  onChangeText={onChange}
                  variant={errors.numPomos ? "error" : undefined}
                  message={
                    errors.numPomos ? "This must be a number" : undefined
                  }
                />
              )}
            />
            <Button
              marginTop="md"
              onPress={handleSubmit(onSubmit)}
              textProps={{ textAlign: "center" }}
            >
              Add Task
            </Button>
          </Box>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default AddTaskModal;
