
import { upload } from '@imagekit/javascript'

const uploadImage = async (image) => {
    if (!image) {
        throw new Error('Please select an image')
    }

    const authResponse = await fetch('http://localhost:8080/api/imagekit/auth', {
        credentials: 'include',
    })
    const auth = await authResponse.json()

    if (!authResponse.ok) {
        throw new Error(auth.message || 'ImageKit authentication failed')
    }

    return upload({
        file: image,
        fileName: image.name,
        token: auth.token,
        expire: auth.expire,
        signature: auth.signature,
        publicKey: auth.publicKey,
    })
}

export default uploadImage

