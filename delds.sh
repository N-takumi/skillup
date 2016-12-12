#!/bin/sh
echo ".DS_Storeを抹殺します"
find ./ -name '*.DS_Store'

find ./ -name '*.DS_Store' | xargs rm
echo "お掃除完了しました"
