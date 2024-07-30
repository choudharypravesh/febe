import { Notification, Button } from '@arco-design/web-react';

export const customNotification = (title, content) => {
    const id = `${Date.now()}`;
    Notification.info({
        id,
        title,
        content,
        duration: 0,
        btn: (
            <span>
                <Button
                    type="secondary"
                    size="small"
                    onClick={() => Notification.remove(id)}
                    style={{ margin: '0 12px' }}
                >
                    Cancel
                </Button>
                <Button type="primary" size="small" onClick={() => Notification.remove(id)}>
                    Ok
                </Button>
            </span>
        ),
    });
};
