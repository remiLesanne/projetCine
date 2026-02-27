# How to use my big toaster component

## Initialiation

First of all, you need to inject **my big component** into YOUR component.
To do that, you need to import **my big component** like this:

```ts
import { ToastService } from '../services/toast'; 
```

Then, inject my component as below:

```ts
private readonly toast = inject(ToastService);
```

## How to use my Toast Component

Now you are ready to use my toast component. 
Here, a list of functions that you can use:
- ok(message: string, title?: string), where **message** is the message you want to show and **title** is an optional parameter to set a title ("Success" by default)
- err(message: string, title?: string), where **message** is the message you want to show and **title** is an optional parameter to set a title ("Error" by default)
- warn(message: string, title?: string), where **message** is the message you want to show and **title** is an optional parameter to set a title ("Warning" by default)
- info(message: string, title?: string), where **message** is the message you want to show and **title** is an optional parameter to set a title ("Information" by default)
- sec(message: string, title?: string), where **message** is the message you want to show and **title** is an optional parameter to set a title ("Secondary" by default)
- contrast(message: string, title?: string), where **message** is the message you want to show and **title** is an optional parameter to set a title ("Contrast" by default)


To use them is very simple. When you want to show one of these messages, thanks of a button, an API call or another trigger, you have just to write:
```ts
this.toast.ok("The movie was added successfully"); 
```
Or
```ts
this.toast.ok("The movie was added successfully", "Movie added"); 
```


## That's all

Now, you just have to enjoy **my big component** 😉
