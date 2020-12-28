import React, { useState } from 'react';
import { IconBaseProps } from 'react-icons';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { Box } from './styles';

interface TooltipProps {
    message: string;
    color: string;
    icon: React.ComponentType<IconBaseProps>;
}

// eslint-disable-next-line react/prop-types
const Tooltip: React.FC<TooltipProps> = ({ message, color, icon: Icon }) => {
    const [isVisible, setIsVisible] = useState(false);

    function handleCloseTooltip() {
        setIsVisible(true);
    }

    return (
        <Box isVisible={isVisible} color={color} id="tooltip">
            <div id="message">
                {Icon && <Icon size={25} />}
                <i>{message}</i>
                <button type="button" onClick={handleCloseTooltip}>
                    <AiOutlineCloseCircle size={20} />
                </button>
            </div>
        </Box>
    );
};

export default Tooltip;
