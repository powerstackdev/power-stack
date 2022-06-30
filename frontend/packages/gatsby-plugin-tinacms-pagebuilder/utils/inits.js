import {useForm, usePlugin, useScreenPlugin} from "tinacms";

// These init functions are a bit of a hack to get around the conditional rules of hooks error

export const InitForm = formConfig => {
  return useForm(formConfig)
}

export const InitPlugin = form => {
  usePlugin(form)

  return null
}

export const InitScreenPlugin = screenPlugin => {
  useScreenPlugin(screenPlugin)

  return null
}