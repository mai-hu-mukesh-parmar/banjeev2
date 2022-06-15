import React, { forwardRef } from "react";
import { Input } from "native-base";

const AppInput = forwardRef((props, ref) => (
	<Input
		backgroundColor={"white"}
		borderColor="black"
		size="lg"
		{...props}
		ref={ref}
	/>
));

export default AppInput;
