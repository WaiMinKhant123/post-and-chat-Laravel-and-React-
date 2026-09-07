<?php

namespace App\Services;

use App\Models\Media;
use Illuminate\Http\UploadedFile;
use CloudinaryLabs\CloudinaryLaravel\Facades\Cloudinary;

class MediaService
{
    public function uploadMedia(
        UploadedFile $file,
        string $mediaableType,
        int|string $mediaableId
    ): Media {
        $type = str_starts_with(
            $file->getMimeType(),
            'image/'
        ) ? 'image' : 'video';

        $folder = strtolower(
            class_basename($mediaableType)
        ) . '/' . $mediaableId;

        $uploadedFile = Cloudinary::uploadAPI()->upload(
            $file->getRealPath(),
            [
                'folder' => $folder,
                'resource_type' => 'auto',
            ]
        );

        return Media::create([
            'file_path' => $uploadedFile['secure_url'],
            'file_type' => $type,
            'public_id' => $uploadedFile['public_id'],
            'mediaable_id' => $mediaableId,
            'mediaable_type' => $mediaableType,
        ]);
    }
}
