import React, { forwardRef } from "react";
import { Input } from "native-base";

const AppInput = forwardRef((props, ref) => (
	<Input
		backgroundColor={"white"}
		size="lg"
		borderColor={"black"}
		// style={{ borderColor: "black", borderWidth: 1 }}
		{...props}
		ref={ref}
	/>
));

export default AppInput;
