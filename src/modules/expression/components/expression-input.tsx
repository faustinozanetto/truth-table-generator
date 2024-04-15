import React from "react";
import { Input } from "ui/components/input";


const ExpressionInput: React.FC= () =>
   {

    return <Input className="h-12 text-base md:h-16 md:text-lg font-medium" placeholder="Enter expression..." spellCheck={false} />
}
export default ExpressionInput