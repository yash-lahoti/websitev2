import React from 'react';

export const PhysicianStatusBar = () => {
    return (
        <div className="h-6 flex items-center px-4 text-xs select-none bg-gradient-to-r from-blue-600 to-blue-500 text-white font-medium" style={{ fontFamily: 'var(--font-body)' }}>

            <div className="flex-1 flex justify-between">
                {/* Clinical Status Bar */}
                <span className="flex items-center gap-2">Rotation: Surgery</span>
                <span className="flex items-center gap-4">
                    <span>Status: On Call</span>
                    <span>Loc: Mount Sinai</span>
                </span>
            </div>
        </div>
    );
};
